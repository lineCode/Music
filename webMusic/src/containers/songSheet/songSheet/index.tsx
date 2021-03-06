import * as React from 'react'
import { BrowserRouter, Link, Route, Redirect } from 'react-router-dom'
import { observer, inject } from 'mobx-react';
import Animate from 'rc-animate';

import './style.css'
import Card from 'antd/lib/card';
import CheckableTag from 'antd/lib/tag/CheckableTag';
import { SSCardComponent } from '../public/card';
import Row from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
// const { CheckableTag } = Tag;
const gridStyle = {
    width: '25%',
    textAlign: 'center',
};
/**
 * 歌单
 */
@inject('songSheetStore')
@observer
export class SongSheetComponent extends React.Component<any, any> {
    tagsFromServer = ["华语", "流行", "摇滚", "民谣", "电子", "轻音乐", "影视原声", "ACG", "怀旧", "治愈"];
    state = {
        selectedTags: [],
    };

    handleChange(tag, checked) {
        const { selectedTags } = this.state;
        const nextSelectedTags = checked ?
            [...selectedTags, tag] :
            selectedTags.filter(t => t !== tag);
        console.log('You are interested in: ', nextSelectedTags);
        this.setState({ selectedTags: nextSelectedTags });
    }
    render() {
        if (this.props.songSheetStore.playlist && this.props.songSheetStore.playlist.length) {
            const { selectedTags } = this.state;
            let playlist = this.props.songSheetStore.playlist.slice();
            playlist && playlist.unshift(
                {
                    to: "",
                    img: "/assets/img/jpgd.png",
                    name: "精品歌单倾心推荐，给最懂音乐的你"
                }
            );
            return (
                // <Animate transitionName="fade" transitionAppear={true} component="">
                    <div key="1">
                        <div style={{ textAlign: "left", padding: "2px" }}>
                            <strong style={{ marginRight: 8 }}>热门标签：</strong>
                            {this.tagsFromServer.map(tag => (
                                <CheckableTag
                                    key={tag}
                                    checked={selectedTags.indexOf(tag) > -1}
                                    onChange={checked => this.handleChange(tag, checked)}
                                >
                                    {tag}
                                </CheckableTag>
                            ))}
                        </div>
                        {/* <SSCardComponent songSheet={{
                        to: "",
                        img: "/assets/img/jpgd.png",
                        name: "精品歌单倾心推荐，给最懂音乐的你"
                    }} /> */}
                        <SSCardComponent songSheet={playlist} />
                    </div>
                // </Animate>
            )
        }
        return <div className="text-center">没有歌单</div>
    }
}