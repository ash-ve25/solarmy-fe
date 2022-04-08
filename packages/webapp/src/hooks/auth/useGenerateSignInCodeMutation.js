import {useMutation} from "@apollo/client";
import M from '../../graphql/auth/GenerateSignInCode.mutation.graphql';

export function useGenerateSignInCodeMutation(options) {
    const [execute, data] = useMutation(M, {...options});
    
    const map = ({data, ...others}) => ({data: data?.generateSignInCode, ...others})
    
    return [
        async ({username}) => map(await execute({
            variables: {
                input: {username}
            }
        })),
        {...map(data)},
    ];
}
