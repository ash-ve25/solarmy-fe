import {useQuery} from "@apollo/client";
import Q from '../../graphql/armory/UnitRarity.query.graphql';

export function useUnitRarityQuery({id} = {}) {
    const {data, ...others} = useQuery(Q, {
        variables: {
            id
        },
        skip: !id
    });
    
    return {
        data: data?.unitRarity,
        ...others
    }
}
