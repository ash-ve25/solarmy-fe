import useAxios from "axios-hooks";

export function useFetchUnitDataLazy(context = {}) {
    const {dataUri: url = ''} = context;
    
    const [payload, refetch] = useAxios(
        {url},
        {
            manual: true
        }
    );
    
    return [
        (url) => refetch({url}),
        payload
    ];
}
