import {useMutation} from "@apollo/client";
import M from '../../graphql/battlefield/ClaimDeployedUnit.mutation.graphql';

export function useClaimDeployedUnitMutation() {
    const [execute, data] = useMutation(M);
    
    const map = ({data, ...others}) => ({data: data?.claimDeployedUnit, ...others})
    
    return [
        async ({unitId}) => map(await execute({
            variables: {
                unitId
            }
        })),
        {...map(data)},
    ];
}
