import {useQuery} from "@apollo/client";
import Q from "../../graphql/battlefield/DeployedUnits.query.graphql";

export function useDeployedUnitsQuery() {
    const {data: {deployedUnits = []} = {}, ...others} = useQuery(Q);
    
    return {
        data: deployedUnits,
        ...others
    };
}
