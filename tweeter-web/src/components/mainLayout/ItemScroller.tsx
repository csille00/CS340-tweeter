import InfiniteScroll from "react-infinite-scroll-component";
import useToastListener from "../toaster/ToastListenerHook";
import React, {useEffect, useRef, useState} from "react";
import useUserInfoHook from "../userInfo/UserInfoHook";
import {PagedItemView} from "../../presenter/PagedItemPresenter";
import {UserItemPresenter} from "../../presenter/UserItemPresenter";
import {StatusItemPresenter} from "../../presenter/StatusItemPresenter";

interface Props<GenericItem> {
    presenterGenerator: (view: PagedItemView<GenericItem>) => UserItemPresenter | StatusItemPresenter;
    componentGenerator: (item: GenericItem) => React.JSX.Element
}

function ItemScroller<GenericItem> (props: Props<GenericItem>) {
    const { displayErrorMessage } = useToastListener();
    const [items, setItems] = useState<GenericItem[]>([]);

    // Required to allow the addItems method to see the current value of 'items'
    // instead of the value from when the closure was created.
    const itemsReference = useRef(items);
    itemsReference.current = items;

    const { displayedUser, authToken } = useUserInfoHook();

    // Load initial items
    useEffect(() => { loadMoreItems();}, []);

    const listener: PagedItemView<GenericItem>= {
        addItems: (newItems: GenericItem[]) => setItems([...itemsReference.current, ...newItems]),
        displayErrorMessage: displayErrorMessage
    }

    const [presenter] = useState(props.presenterGenerator(listener))

    const loadMoreItems = async () => presenter.loadMoreItems(authToken, displayedUser)

    return (
        <div className="container px-0 overflow-visible vh-100">
            <InfiniteScroll
                className="pr-0 mr-0"
                dataLength={items.length}
                next={loadMoreItems}
                hasMore={presenter.hasMoreItems}
                loader={<h4>Loading...</h4>}>
                {items.map((item, index) => (
                    <div
                        key={index}
                        className="row mb-3 mx-0 px-0 border rounded bg-white">
                        {props.componentGenerator(item)}
                    </div>
                ))}
            </InfiniteScroll>
        </div>
    );
}

export default ItemScroller