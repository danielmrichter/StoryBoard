import { useEffect } from "react";
import ReactGridLayout from "react-grid-layout";
import { useDispatch, useSelector } from "react-redux";

export default function ProjectView() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch({type: 'FETCH_PROJECT_ITEMS', payload: user.id})
    }, [])
    const user = useSelector(store => store.user)
    const projectItems = useSelector(store => store.projectItems)
    return(
        <ReactGridLayout>

        </ReactGridLayout>
    )
}
