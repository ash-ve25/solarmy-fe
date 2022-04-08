import {useMutation} from "@apollo/client";
import M from '../../graphql/battlefield/DeployUnit.mutation.graphql';

export function useDeployUnitMutation() {
    const [execute, data] = useMutation(M);
    
    const map = ({data, ...others}) => ({data: data?.deployUnit, ...others})
    
    return [
        async ({unitId, time}) => map(await execute({
            variables: {
                input: {unitId, time}
            }
        })),
        {...map(data)},
    ];
}
