import Info from './Info';
import Users from './Users';
import GuestBook from './GuestBook';
import TopPost from './TopPost';
import Challenge from './Challenge';
import axios from "../util/axiosUtil";
import Setting from '../component/Setting';
import { useTranslator } from '../util/LanguageUtil';
function MainPage(props) {

    const logout = (e) => {
        axios.get(`/api/logout`).then((res) => {
            console.log("logout", res.data);
            props.changeState(res.data);
        });
    }

    // const _setLang = () => {
    //     let rst;
    //     const callback = (result) => {
    //         rst = LanguageUtil.getLangObj(result);
    //         console.log('callback: ', rst);
    //     }
    //     LanguageUtil.getCurLeng(callback);
    //     return rst;
        // LanguageUtil.getCurLeng().then((result) => {
        //     return LanguageUtil.getLangObj(result);
        // });
    // }

    return (
        // <div className="main">
        //     <Info/>
        //     <div className="main-right">
        //         <div className="main-right-top">
        //             <User/>
        //             <div className="main-right-top-right">
        //                 <GuestBook/>
        //                 <TopPost/>
        //             </div>
        //         </div>
        //         <Challenge/>
        //     </div>
        // </div>
        <div className="main">
            <div className='langBtn'>
                <Setting/>
                <button className='toppost'>
                    <div className="logout-btn" onClick={logout}>{useTranslator("mainPage.logout")}</div>
                </button>
            </div>
            <div className="main-left">
                <Info/>
            </div>
            <div className="main-center">
                <Users/>
                <div className='from-host'>
                    <div className='host-msg'>{useTranslator("mainPage.welcome")}</div>
                </div>
            </div>    
            <div className="main-right">
                <GuestBook/>
                <TopPost/>
            </div>
            <div className="main-bottom">
                <Challenge/>
            </div>
        </div>
    );

}

export default MainPage;