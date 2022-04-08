import M from '../../graphql/account/ChangeAccountUsername.mutation.graphql';
import {useMutation} from "@apollo/client";

export function useChangeAccountUsernameMutation() {
    const [execute, {data = {}, ...others}] = useMutation(M);
    
    const map = ({changeUsername = {}} = {}) => changeUsername;
    
    return [
        async ({username}) => map(await execute({variables: {input: {username}}})),
        {
            data: map(data),
            ...others
        }
    ]
}
