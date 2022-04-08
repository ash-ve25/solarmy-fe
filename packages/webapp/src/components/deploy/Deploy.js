import React, {useState} from "react";
import {useGetUnitsAsList} from "../../hooks/unit/useGetUnitsAsList";
import {UnitList} from "./UnitList";
import {useDeployedUnitsQuery} from "../../hooks/battlefield/useDeployedUnitsQuery";
import {HeaderApp} from "../header-app/HeaderApp";
import {FooterApp} from "../footer-app/FooterApp";
import {Layout} from 'antd';
import {Loader} from "../ui/Loader";
import {useAmmo} from "../../hooks/ammo/useAmmo";
import {Config} from "../../Config";

const {Content} = Layout;
const {
    blockchain: {
        refetchAmmoTimeoutAfterClaim = 7000
    } = {}
} = Config;

export function Deploy(props) {
    const [view, setView] = useState('normal');
    const {units, loading, error} = useGetUnitsAsList();
    const {data: deployedUnits, refetch} = useDeployedUnitsQuery();
    const {refetch: refetchAmmo} = useAmmo();
    
    const isLoading = loading;
    
    const totalDeployedUnits = deployedUnits.length;
    const totalUnits = units.length;
    
    const setNormalView = () => setView('normal');
    const setDenseView = () => setView('dense');
    
    const onDeployUnit = () => refetch();
    const onDelistUnit = () => refetch();
    const onClaimUnit = async (context) => {
        await refetch();
        
        setTimeout(() => {
            refetchAmmo()
        }, refetchAmmoTimeoutAfterClaim)
    };
    
    const getActiveTabClass = (currentView) => view === currentView ? 'active' : '';
    
    return (
        <div className="deploy">
            <Layout>
                <HeaderApp></HeaderApp>
                
                <Content>
                    {isLoading && <Loader/>}
                    
                    {!isLoading && <div>
                        <div className="deploy-unit-info">
                            
                            <div className="deploy-info-number">
                                <span className="deploy-icon"></span>
                                <span className="title">Soldiers deployed</span>
                                <span className="number">{totalDeployedUnits}/{totalUnits}</span>
                            </div>
                            
                            <div className="marketplace-button">
                                <a href="https://magiceden.io/creators/solarmy"
                                   target="_blank">Marketplace <span></span></a>
                            </div>
                            
                            <div className="deploy-unit-list-info-view-swticher">
                                <button className={getActiveTabClass('normal')}
                                        onClick={setNormalView}>NORMAL VIEW
                                </button>
                                <button className={getActiveTabClass('dense')}
                                        onClick={setDenseView}>DENSE VIEW
                                </button>
                            </div>
                        </div>
                        
                        <UnitList units={units}
                                  deployedUnits={deployedUnits}
                                  onDeployUnit={onDeployUnit}
                                  onDelistUnit={onDelistUnit}
                                  onClaimUnit={onClaimUnit}
                                  view={view}/>
                    </div>}
                </Content>
                
                <FooterApp></FooterApp>
            </Layout>
        </div>
    )
}
