import DateUtil from "../util/DateUtil";
import axios from "../util/axiosUtil";
import { useEffect, useState, useRef } from 'react';
import { useTranslator } from "../util/LanguageUtil";

function BlogList(props) {
    const _className = props.className.indexOf(" ") > 0? props.className.split(" ") : [props.className];
    const date = DateUtil.getDate(new Date(props.date).getTime() - new Date(props.date).getTimezoneOffset()*DateUtil.MINUTES_TO_MILLISECONDS, "desc", true);
    let className = _className[0]; 
    const list = [];
    let idx = 1;
    if(props.date) list.push(<div key={idx++} className={`${className}-date`}>{date}</div>);
    if(props.name) list.push(<div key={idx++} className={`${className}-name`}>{props.name}</div>);
    if(props.content) list.push(<div key={idx} className={`${className}-title`}>{props.content}</div>);
    let result =  props.onClick ? 
        <div className={'blog-list ' + props.className} onClick={(e) => props.onClick(e, props.sq)}>{list}</div> :
        <div className={'blog-list ' + props.className}>{list}</div>

    return result;
}

let loginInfo;
function CommentList(props) {
    const [comment, setComment] = useState([]);
    const commentDiv = useRef(null);
    const commentInput = useRef(null);
    const getComment = () => {
        axios.get(`/api/getBlogComment?sq=${props.selectedPost}`).then((res) => {
            const result = res.data.result;
            const _blogArr = [];
            let idx = 0;
            result.forEach((blog) => {
                const _blog = <BlogList className="comment" key={idx++} content={blog.CONTENT} date={blog.DATE} name={blog.NAME} title='comment'></BlogList>
                _blogArr.push(_blog);
            });
            setComment(_blogArr);
        });
    }

    useEffect(() => {
        axios.get(`/api/isLogined`).then((res) => {
            if(res && res.data.isLogined) loginInfo = res.data;
            else loginInfo = undefined;
        });
    }, []);

    useEffect(() => {
        if(props.selectedPost) {
            if(props.selectedPost == 'new') {
                setComment(null);
                commentInput.current.style.display = 'none';
            } else {
                getComment();
                commentInput.current.style.display = '';
            }
        }
    }, [props.selectedPost]);

    // 댓글 최신순으로 보이도록, 새로운 댓글 등록 시 스크롤 맨 밑으로.
    useEffect(() => {
        commentDiv.current.scrollTop = commentDiv.current.scrollHeight;
    }, [comment]);

    const noPermission = useTranslator("login.permissionDenied");
    let enterFlag = false;
    // 엔터 눌렸는지 확인
    const handleOnKeyPress = (e) => {

        if(e.key == 'Enter') {
            if(enterFlag) {
                e.currentTarget.value = "";
                enterFlag = false;
                return;
            } else if(typeof loginInfo == 'undefined') {
                alert(noPermission);
                e.currentTarget.value = "";
                enterFlag = true;
                return;
            }
            const val = e.currentTarget.value;
            const utc = DateUtil.getUtc(new Date());
            const sequence = `SQ_${utc}`;
            const info = {
                sq: sequence,
                content: val,
                date: DateUtil.getDate(utc, "desc"),
                id: loginInfo.userid,
                parent: props.selectedPost
            };
            axios.post("/api/insertBlogComment", info).then((res) => {
                if(res.data.result) getComment();
                else console.log('댓글 insert 실패', res);
                console.log(commentDiv.current);
                // commentDiv.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
                commentDiv.current.scrollTop = commentDiv.current.scrollHeight;
            });
            e.currentTarget.value = "";
            enterFlag = true;
        }
    }

    return (
        <div className='comments'>
            <div className='comment-list scroll' ref={commentDiv}>
                {comment}
            </div>
            <div className="comment-input">
                <input type="text" ref={commentInput} className="input-text" placeholder={useTranslator('blog.comment')} autoFocus onKeyDown={handleOnKeyPress}></input>
            </div>
        </div>
    );

}

export { BlogList, CommentList };