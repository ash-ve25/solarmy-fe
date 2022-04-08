import React, {useState, useMemo} from "react";
import {useFetchUnitData} from "../../hooks/unit/useFetchUnitData";
import {UnitImage} from "../ui/UnitImage";
import {parseSoldierNumber} from "../../utils/parseSoldierNumber";
import {Loader} from "../ui/Loader";
import classname from 'classnames';
import {DeployedUnitStatus} from "../../enum/DeployedUnitStatus";
import moment from 'moment';
import {useDeployUnitMutation} from "../../hooks/battlefield/useDeployUnitMutation";
import {useDelistUnitMutation} from "../../hooks/battlefield/useDelistUnitMutation";
import {useClaimDeployedUnitMutation} from "../../hooks/battlefield/useClaimDeployedUnitMutation";
import { Modal } from 'antd';

export function UnitListItem(props) {
    const {
        unit: {
            id,
            name = '',
            uri
        } = {},
        deployedUnit,
        onDeployUnit,
        onDelistUnit,
        onClaimUnit
    } = props;
    
    const [deployUnit] = useDeployUnitMutation();
    const [delistUnit] = useDelistUnitMutation();
    const [claimUnit] = useClaimDeployedUnitMutation();
    const [isBusy, setBusy] = useState(false);
    const [isStakeView, setStakeView] = useState(false);
    const [isProceedDeploy, setIsProceedDeploy] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [stakeNumber, setStakeNumber] = useState(1);
    const [isModalDelistVisible, setIsModalDelistVisible] = useState(false);
    const {data: {image: imageUri} = {}, loading} = useFetchUnitData({uri});
    
    
    const {status: deployedUnitStatus, reward, time: deployedTime = 0} = deployedUnit || {};
    
    const isReadyToClaim = deployedUnitStatus === DeployedUnitStatus.ReadyToClaim;
    const isDeployed = !!deployedUnit;
    const deployDays = [1, 5, 10, 15, 30];
    const isLoading = loading;
    
    const leftDaysToClaim = useMemo(() => {
        if (!deployedUnit?.releaseAt) {
            return 0;
        }
        
        const now = moment();
        const releaseAt = moment(deployedUnit?.releaseAt);
        const diff = releaseAt.diff(now, 'seconds');
   
        let diffDays = Math.ceil(diff/60/60/24);
        diffDays = diffDays < 0 ? 0 : diffDays;
        
        return diffDays > deployedTime ? 0 : deployedTime - diffDays;
    }, [deployedUnit?.releaseAt]);
    
    const number = parseSoldierNumber(name);

    const getProgressPercentage = () => {
        const progressNumber = leftDaysToClaim * 100 / deployedTime;
        
        return progressNumber <= 0 ? 0 : progressNumber > 100 ? 100 : progressNumber;
    };

    const progressPercentage = getProgressPercentage();
    
    const handleDeployUnit = () => {
        setStakeView(true);
    };

    const handleProceedStake = async (time) => {
        setStakeView(false);
        setIsProceedDeploy(true);
        setCurrentTime(time);
    }

    const handleProceedDeploy = async () => {
        handleStakeUnit(currentTime);
    }

    const handleProceedCancel = async (time) => {
        setIsProceedDeploy(false);
    }
    
    const handleStakeUnit = async (time) => {
        try {
            setBusy(true);
            
            await deployUnit({
                unitId: id,
                time
            });
            await onDeployUnit?.();
        } catch (e) {}

        setStakeView(false);
        setIsProceedDeploy(false);
        setBusy(false);
    };
    
    const handleDelistUnit = async () => {
        try {
            setIsModalDelistVisible(false);
            setBusy(true);
            
            await delistUnit({
                unitId: id
            });
            await onDelistUnit?.();
        } catch (e) {}
    
        setBusy(false);
    };
    
    const handleClaimUnit = async () => {
        try {
            setBusy(true);
            
            await claimUnit({
                unitId: id
            });
            await onClaimUnit?.();
        } catch (e) {}
    
        setBusy(false);
    };
    
    const handleHoverStakeUnit = (number) => {
        setStakeNumber(number);
    };
    
    const htmlClassname = classname('deploy-unit-list-item-content-data', {
        'is-deploy': !isDeployed
    });
    
    return (
        <div className="deploy-unit-list-item">
            {isLoading && <Loader/>}
            
            {!isLoading && (<div className="deploy-unit-list-item-content">
                <UnitImage uri={imageUri}/>
                
                <div className={htmlClassname}>
                    {isBusy && <Loader />}
                    
                    {!isBusy && <>
                        {!isStakeView && <div>
                            <div className="deploy-unit-list-item-content-info">
                                <span className="number">#{number}</span>
                                {isDeployed ? <span className="mission active"><span></span>Active mission</span> :
                                    <span className="mission reserve"><span></span>Reserve</span>}
                            </div>
        
                            {isDeployed && <div className="deploy-unit-list-item-content-progress">
                                <p className="days">Deployed days <span>{leftDaysToClaim}/{deployedTime}</span></p>
                                <div className="deploy-unit-list-item-content-progress-bar"><span
                                    style={{width: progressPercentage + '%'}}></span></div>
                                <p className="rewards">AMMO Rewards <span>AMMO {reward}</span></p>
                                {/* <p className="result">XP <span>X</span></p> */}
                            </div>}
                        </div>}
    
                        {(!isStakeView && isDeployed && !isReadyToClaim) &&
                        <button className="delist-btn"
                                onClick={() => setIsModalDelistVisible(true)}>DELIST</button>}
    
                        {(!isStakeView && isReadyToClaim && isDeployed) &&
                        <button className="claim-btn"
                                onClick={handleClaimUnit}>CLAIM</button>}
    
                        {isStakeView && !isProceedDeploy && <div className="deploy-unit-list-item-content-deploy-days">
                            <p className="title">Stake soldier</p>
                            <div className="deploy-days">
                                {deployDays.map((number, key) => <div className={stakeNumber === number ? 'active' : ''}
                                                                    key={key}
                                                                    onMouseEnter={() => handleHoverStakeUnit(number)}
                                                                    onClick={() => handleProceedStake(number)}>{number}</div>)}
                            </div>
                        </div>}

                        {isProceedDeploy && !isDeployed && <div className="proceed-deploy">
                            <button className="deploy-btn" onClick={handleProceedDeploy}>DEPLOY</button>
                            <button className="cancel-btn" onClick={handleProceedCancel}>CANCEL</button>
                        </div>}

                        {(isStakeView || isProceedDeploy) && <p className="bonus">{stakeNumber} days = <span>{90 * stakeNumber} AMMO</span></p>}
    
                        {!isStakeView && !isDeployed && !isProceedDeploy && <div className="deploy-unit-list-item-content-action">
                            <button className="deploy-btn" onClick={handleDeployUnit}>DEPLOY</button>
                        </div>}
                    </>}
                </div>
            </div>)}

            <Modal
                wrapClassName="delist-modal"
                title="Warning"
                closable={false}
                centered
                visible={isModalDelistVisible}
                footer={[
                    <button key="cancel" className="cancel-btn"  onClick={() => setIsModalDelistVisible(false)}>
                      CANCEL
                    </button>,
                    <button key="accept" className="accept-btn" onClick={handleDelistUnit}>
                        ACCEPT
                    </button>
                  ]}
            >
                <p>You will loose all progress and rewards if you delist.</p>
            </Modal>
        </div>
    )
}
