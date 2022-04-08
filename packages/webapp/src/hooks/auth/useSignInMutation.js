import {useMutation} from "@apollo/client";
import M from '../../graphql/auth/SignIn.mutation.graphql';

export function useSignInMutation(options) {
    const [execute, data] = useMutation(M, {...options});
    
    const map = ({data, ...others}) => ({data: data?.signIn, ...others})
    
    return [
        async ({username, signature}) => map(await execute({
            variables: {
                input: {username, signature}
            }
        })),
        {...map(data)},
    ];
}
