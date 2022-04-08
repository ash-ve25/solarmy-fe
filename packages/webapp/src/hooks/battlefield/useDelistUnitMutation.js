import {useMutation} from "@apollo/client";
import M from '../../graphql/battlefield/DelistUnit.mutation.graphql';

export function useDelistUnitMutation() {
    const [execute, data] = useMutation(M);
    
    const map = ({data, ...others}) => ({data: data?.delistUnit, ...others})
    
    return [
        async ({unitId}) => map(await execute({
            variables: {
                unitId
            }
        })),
        {...map(data)},
    ];
}
