(this.webpackJsonpYAHNW=this.webpackJsonpYAHNW||[]).push([[0],[,,,,,,,,function(t,e,s){},,,,,,,function(t,e,s){},,function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){},function(t,e,s){"use strict";s.r(e);var i=s(1),n=s.n(i),c=s(9),o=s.n(c),A=(s(15),s(2)),a=s(3),r=s(5),l=s(4),h=s(6),d=(s(8),s(10)),j=s.n(d);function u(t){var e=Math.floor(Date.now()/1e3)-t;if(e>=86400){var s=Math.floor(e/86400);return s>1?"".concat(s," days ago"):"1 day ago"}if(e>=3600){var i=Math.floor(e/3600);return i>1?"".concat(i," hours ago"):"1 hour ago"}var n=Math.floor(e/60);return n>0?n>1?"".concat(n," minutes ago"):"1 minute ago":"Just Posted"}var b=s(0),f=function(t){Object(r.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(A.a)(this,s),(i=e.call(this,t)).state={kids:null,comment:null,isHidden:!1},i}return Object(a.a)(s,[{key:"fetchComments",value:function(t){fetch("https://hacker-news.firebaseio.com/v0/item/"+t+".json").then((function(t){return t.json()})).then(function(t){this.setState({comment:t})}.bind(this))}},{key:"componentDidMount",value:function(){this.fetchComments(this.props.rootKid)}},{key:"componentDidUpdate",value:function(t){this.props.rootKid!==t.rootKid&&(this.setState({isHidden:!1}),this.fetchComments(this.props.rootKid))}},{key:"authorClicked",value:function(){this.setState({isHidden:!this.state.isHidden})}},{key:"render",value:function(){var t=this;if(this.state.comment&&!this.state.comment.deleted){var e=j.a.sanitize(this.state.comment.text),i=[];if(this.state.comment.kids){var n,c=Object(h.a)(this.state.comment.kids);try{for(c.s();!(n=c.n()).done;){var o=n.value;i.push(Object(b.jsx)(s,{rootKid:o,nesting:this.props.nesting+1},o))}}catch(A){c.e(A)}finally{c.f()}}return this.state.isHidden?Object(b.jsx)("div",{style:{paddingLeft:0===this.props.nesting?"0%":"2%"},children:Object(b.jsx)("div",{style:{marginLeft:"4px",borderLeft:0===this.props.nesting?"none":"2px solid #a5a09f"},children:Object(b.jsxs)("button",{className:"comment-author",onClick:function(){return t.authorClicked()},children:[Object(b.jsx)("div",{className:"triangle-box",children:Object(b.jsx)("div",{className:"triangle-down-comment"})}),this.state.comment.by,Object(b.jsx)("p",{className:"time",children:u(this.state.comment.time)})]})})}):Object(b.jsx)("div",{style:{paddingLeft:0===this.props.nesting?"0%":"2%"},children:Object(b.jsxs)("div",{style:{marginLeft:"4px",borderLeft:0===this.props.nesting?"none":"2px solid #a5a09f"},children:[Object(b.jsxs)("button",{className:"comment-author",onClick:function(){return t.authorClicked()},children:[Object(b.jsx)("div",{className:"triangle-box",children:Object(b.jsx)("div",{className:"triangle-up-comment"})}),this.state.comment.by,Object(b.jsx)("p",{className:"time",children:u(this.state.comment.time)})]}),Object(b.jsx)("div",{style:{paddingLeft:"2%"},children:Object(b.jsx)("div",{className:"comment-box",dangerouslySetInnerHTML:{__html:e}})}),i]})})}return Object(b.jsx)("div",{})}}]),s}(i.Component),m=function(t){Object(r.a)(s,t);var e=Object(l.a)(s);function s(){return Object(A.a)(this,s),e.apply(this,arguments)}return Object(a.a)(s,[{key:"render",value:function(){if(this.props.kids){var t,e=[],s=Object(h.a)(this.props.kids);try{for(s.s();!(t=s.n()).done;){var i=t.value;e.push(Object(b.jsx)(f,{rootKid:i,nesting:0,shouldHide:!1},i))}}catch(n){s.e(n)}finally{s.f()}return Object(b.jsx)("div",{className:"comment-window",children:e})}return Object(b.jsx)("div",{children:Object(b.jsx)("p",{className:"click-comment-message",children:"Click on a speech bubble"})})}}]),s}(i.Component),g=(s(17),function(t){Object(r.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(A.a)(this,s),(i=e.call(this,t)).state={json:null},i}return Object(a.a)(s,[{key:"componentDidMount",value:function(){fetch("https://hacker-news.firebaseio.com/v0/item/"+this.props.id+".json").then((function(t){return t.json()})).then(function(t){this.setState({json:t})}.bind(this))}},{key:"commentIconClicked",value:function(){this.props.commentCallback(this.state.json.kids,this.state.json.id)}},{key:"render",value:function(){var t=this;return this.state.json?this.props.isMobile?Object(b.jsxs)("div",{className:"story-container",style:this.props.selected?{borderLeft:"10px solid #3b2e2a"}:{},children:[Object(b.jsxs)("div",{style:{float:"left",width:"85%"},children:[Object(b.jsx)("a",{className:"title",href:this.state.json.url,children:this.state.json.title}),Object(b.jsxs)("div",{className:"flex",children:[Object(b.jsx)("p",{className:"author",children:this.state.json.by}),Object(b.jsx)("p",{className:"time-story",children:u(this.state.json.time)})]}),Object(b.jsx)("a",{className:"link",href:this.state.json.url,children:this.state.json.url})]}),Object(b.jsx)("div",{className:"points-box",children:Object(b.jsxs)("div",{className:"flex",children:[Object(b.jsx)("p",{className:"score",children:this.state.json.score}),Object(b.jsx)("div",{className:"triangle-up"})]})}),Object(b.jsx)("div",{style:{clear:"both"}})]}):Object(b.jsxs)("div",{className:"story-container",style:this.props.selected?{borderLeft:"10px solid #3b2e2a"}:{},children:[Object(b.jsxs)("div",{style:{float:"left",width:"85%"},children:[Object(b.jsx)("a",{className:"title",href:this.state.json.url,children:this.state.json.title}),Object(b.jsxs)("div",{className:"flex",children:[Object(b.jsx)("p",{className:"author",children:this.state.json.by}),Object(b.jsx)("p",{className:"time-story",children:u(this.state.json.time)})]}),Object(b.jsx)("a",{className:"link",href:this.state.json.url,children:this.state.json.url})]}),Object(b.jsxs)("div",{className:"comments-and-points-box",children:[Object(b.jsxs)("div",{className:"flex",children:[Object(b.jsx)("p",{className:"score",children:this.state.json.score}),Object(b.jsx)("div",{className:"triangle-up"})]}),Object(b.jsxs)("button",{className:"flex comment-button",onClick:function(){return t.commentIconClicked()},children:[Object(b.jsx)("p",{className:"comment-count",children:this.state.json.kids?this.state.json.kids.length:0}),Object(b.jsx)("img",{src:"data:image/png;base64,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",alt:"speech bubble",className:"speech-bubble"})]})]}),Object(b.jsx)("div",{style:{clear:"both"}})]}):Object(b.jsx)("div",{})}}]),s}(i.Component)),E=(s(18),function(t){Object(r.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(A.a)(this,s),(i=e.call(this,t)).commentClickCallback=function(t,e){i.setState({kids:t,selectedStory:e})},i.handleWindowSizeChange=function(){i.state.isMobile!==i.isMobileView()&&i.setState({isMobile:!i.state.isMobile})},i.ref=n.a.createRef(),i.state={data:null,kids:null,selectedStory:null,isMobile:i.isMobileView()},i}return Object(a.a)(s,[{key:"componentDidUpdate",value:function(t){this.props.storyMode!==t.storyMode&&(this.fetchStories(),this.scrollToTopOfPage())}},{key:"componentDidMount",value:function(){this.fetchStories(),window.addEventListener("resize",this.handleWindowSizeChange)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowSizeChange)}},{key:"scrollToTopOfPage",value:function(){this.ref.current.scrollTo(0,0)}},{key:"fetchStories",value:function(){var t;t="Top"===this.props.storyMode?"https://hacker-news.firebaseio.com/v0/topstories.json":"Best"===this.props.storyMode?"https://hacker-news.firebaseio.com/v0/beststories.json":"New"===this.props.storyMode?"https://hacker-news.firebaseio.com/v0/newstories.json":"https://hacker-news.firebaseio.com/v0/topstories.json",fetch(t).then((function(t){return t.json()})).then(function(t){this.setState({data:t})}.bind(this))}},{key:"isMobileView",value:function(){return window.innerWidth<=1e3}},{key:"render",value:function(){if(this.state.data){var t,e=[],s=Object(h.a)(this.state.data);try{for(s.s();!(t=s.n()).done;){var i=t.value;e.push(Object(b.jsx)(g,{id:i,commentCallback:this.commentClickCallback,isMobile:this.state.isMobile,selected:this.state.selectedStory===i&&!this.state.isMobile},i))}}catch(n){s.e(n)}finally{s.f()}return this.isMobileView()?Object(b.jsx)("div",{className:"wrap",children:Object(b.jsx)("div",{className:"story-window box-full",ref:this.ref,children:e})}):Object(b.jsxs)("div",{className:"wrap",children:[Object(b.jsx)("div",{className:"story-window box-left",ref:this.ref,children:e}),Object(b.jsx)("div",{className:"box-right",children:Object(b.jsx)(m,{kids:this.state.kids})})]})}return Object(b.jsx)("div",{children:Object(b.jsx)("p",{className:"loading",children:"Loading..."})})}}]),s}(i.Component)),Q=(s(19),function(t){Object(r.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(A.a)(this,s),(i=e.call(this,t)).state={selectedButton:"Top"},i}return Object(a.a)(s,[{key:"storyButtonClicked",value:function(t){this.props.storyModeChangedCallback(t),this.setState({selectedButton:t})}},{key:"render",value:function(){var t=this;return Object(b.jsxs)("div",{className:"ribbon",children:[Object(b.jsx)("a",{href:"https://github.com/MitchelPaulin/YAHNW",className:"site-title",children:"YAHNW"}),Object(b.jsxs)("div",{className:"button-box",children:[Object(b.jsx)("button",{className:"story-button",onClick:function(){return t.storyButtonClicked("Top")},children:"Top"===this.state.selectedButton?Object(b.jsx)("b",{children:"Top"}):Object(b.jsx)("p",{children:"Top"})}),Object(b.jsx)("button",{className:"story-button",onClick:function(){return t.storyButtonClicked("Best")},children:"Best"===this.state.selectedButton?Object(b.jsx)("b",{children:"Best"}):Object(b.jsx)("p",{children:"Best"})}),Object(b.jsx)("button",{className:"story-button",onClick:function(){return t.storyButtonClicked("New")},children:"New"===this.state.selectedButton?Object(b.jsx)("b",{children:"New"}):Object(b.jsx)("p",{children:"New"})})]})]})}}]),s}(i.Component)),B=(s(20),function(t){Object(r.a)(s,t);var e=Object(l.a)(s);function s(t){var i;return Object(A.a)(this,s),(i=e.call(this,t)).storyModeChanged=function(t){i.setState({storyMode:t})},i.state={storyMode:"Top"},i}return Object(a.a)(s,[{key:"render",value:function(){return Object(b.jsxs)("div",{className:"App",children:[Object(b.jsx)(Q,{storyModeChangedCallback:this.storyModeChanged}),Object(b.jsx)(E,{storyMode:this.state.storyMode})]})}}]),s}(i.Component));o.a.render(Object(b.jsx)(n.a.StrictMode,{children:Object(b.jsx)(B,{})}),document.getElementById("root"))}],[[21,1,2]]]);
//# sourceMappingURL=main.6448303b.chunk.js.map