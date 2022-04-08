import React, {useState} from "react";
import classname from 'classnames';
import {Loader} from "./Loader";

export function UnitImage(props) {
    const {
        uri = ''
    } = props;
    
    const [isLoading, setLoading] = useState(true);
    
    const htmlClassname = classname('unit-image', {
        'unit-image--loading': isLoading
    });
    
    const onLoad = () => setLoading(false);
    
    return <div className={htmlClassname}>
        {isLoading && <Loader />}
        
        <img src={uri} onLoad={onLoad} />
    </div>
}
