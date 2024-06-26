import ScrollComp from "./ScrollComp";

function Default(props) {
    const switchFlag = (curr) => {
        const index = 0;
        let _curr;
        if(curr == 'end') _curr = true;
        else if(curr == 'noScroll') _curr = curr;
        else _curr = false;
        props.switchFlag(index, _curr);
    }
    return (
        <div className="info-board">
            <ScrollComp className="txt-default vertical visible" switchFlag={switchFlag}>
                Hi there!
                <br />
                <br />
                I am an Experienced Full Stack Web Developer.
                <br />
                <br />
                I've worked for developing and maintaining web applications for 2 years.
                <br />
                <br />
                I have strong problem-solving, time management, and teamwork skills.
            </ScrollComp>
        </div>
    );
}

function Info(props) {
    const switchFlag = (curr) => {
        const index = 2;
        let _curr;
        if(curr == 'start') _curr = true;
        else if(curr == 'noScroll') _curr = curr;
        else _curr = false;
        props.switchFlag(index, _curr);
    }
    return (
        <div className="info-board">
            <ScrollComp className="txt-info vertical visible" switchFlag={switchFlag}>
                {/* <label className='info-board-title'> {`< INFO />`} </label> */}
                <div className='basic-info'>
                    <div className='info-label'>
                        <label className='title'>ADDRESS</label>
                        <label className='content'>Toronto, Canada</label>
                    </div>
                    <div className='info-label'>
                        <label className='title'>EMAIL</label>
                        <label className='content'>gjtnals258@gmail.com</label>
                    </div>
                </div>
                <div className='info-label full'>
                    <label className='title'>EDUCATION</label>
                    <label className='content'>Bachelor's degree, Juju National University</label>
                    <label className='content second'>Graduated in Elementary Education with a focus on computer education.</label>
                    <label className='content second'>Korea, Mar 2014 - Feb 2018</label>
                </div>
                <div className='info-label full'>
                    <label className='title'>COURSE</label>
                    <label className='content'>Java Full-Stack Web Developer Boot Camp</label>
                    <label className='content second'>Korea, July 2020 - Jan 2021</label>
                </div>
            </ScrollComp>
        </div>
    );
}

function Skills(props) {
    const skills = [
        {
            title: 'HTML5',
            level: 5
        },
        {
            title: 'CSS',
            level: 4
        },
        {
            title: 'JavaScript',
            level: 4
        },
        {
            title: 'React',
            level: 4
        },
        {
            title: 'Node.js',
            level: 3
        },
        {
            title: 'Git',
            level: 4
        },
        {
            title: 'Java',
            level: 4
        },
        {
            title: 'MySQL',
            level: 4
        },
        {
            title: 'Spring',
            level: 3
        },
    ];
    const content = [];
    for(let i = 0; i < skills.length; i++) {
        const skill = skills[i];
        content.push(<Skill title={skill.title} level={skill.level} key={i+1} index={i}/>);
    }
    const switchFlag = (curr) =>{
        const index = 1;
        let _curr;
        if(curr == 'middle') _curr = false;
        else if(curr == 'noScroll') _curr = curr;
        else _curr = true;
        props.switchFlag(index, _curr);
    }
    return (
        <div className="info-board">
            <ScrollComp className="txt-skill vertical visible" switchFlag={switchFlag}>
                {/* <label className='info-board-title'> {`< SKILLS />`} </label> */}
                {content}
            </ScrollComp>
        </div>
    );
}

function Skill(props) {
    const level = [];
    let _level = props.level;
    let skillClassName = 'skill ';
    if(props.index % 2 == 0) skillClassName += 'even';
    for(let i = 0; i < 5; i++) {
        if(_level-- > 0) level.push(<span key={i+1} className="level">●</span>);
        else level.push(<span key={i+1} className="level">◦</span>);
    }
    return (
        <div className={skillClassName}>
            <label className='title'>{props.title}</label>
            <span className="levels">{level}</span>
        </div>
    );
}
export {Default, Skills, Info};