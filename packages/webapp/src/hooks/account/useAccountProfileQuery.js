import Q from '../../graphql/account/AccountProfile.query.graphql';
import {useQuery} from "@apollo/client";

export function useAccountProfileQuery() {
    const {data: {accountProfile = {}} = {}, ...others} = useQuery(Q);
    
    return {
        data: accountProfile,
        ...others
    };
}
