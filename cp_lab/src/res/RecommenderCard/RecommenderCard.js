import { Component } from "react";
import React from "react";
import Axios from "axios";
import "./RecommenderCard.css";
import PieChart from "../Charts/PieChart/PieChart";
import DoughnutChart from "../Charts/DoughnutChart/DoughnutChart";
import FadeScroll from "../FadeScroll/FadeScroll";
import WavyText from "../WavyText/WavyText";
import BarChart from "../Charts/BarChart/BarChart";
import ScatterChart from "../Charts/ScatterChart/ScatterChart";
import { fetchRecommendations } from "../../helper";
import Spinner from "../Spinner/Spinner";
let taglist = [
    "*special",
    800,
    900,
    1000,
    1100,
    1200,
    1300,
    1400,
    1500,
    1600,
    1700,
    1800,
    1900,
    "2-sat",
    2000,
    2100,
    2200,
    2300,
    2400,
    2500,
    2600,
    2700,
    2800,
    2900,
    3000,
    3100,
    3200,
    3300,
    3400,
    3500,
    "binary search",
    "bitmasks",
    "brute force",
    "chinese remainder theorem",
    "combinatorics",
    "constructive algorithms",
    "data structures",
    "dfs and similar",
    "divide and conquer",
    "dp",
    "dsu",
    "expression parsing",
    "fft",
    "flows",
    "games",
    "geometry",
    "graph matchings",
    "graphs",
    "greedy",
    "hashing",
    "implementation",
    "interactive",
    "math",
    "matrices",
    "meet-in-the-middle",
    "number theory",
    "probabilities",
    "schedules",
    "shortest paths",
    "sortings",
    "string suffix structures",
    "strings",
    "ternary search",
    "trees",
    "two pointers"
  ];
class RecommenderCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      handles: this.props.handles,
      maxRating: 0,
      submissions: [],
      problemsSolved: new Set(),
      tagCount: new Map(),
      recommendations: [],
    };
  }
  async getStat() {
    let data = {
      handles: this.props.handles,
      maxRating: 0,
      submissions: [],
      problemsSolved: new Set(),
      tagCount: new Map(),
      recommendations: [],
    };
    this.setState(data);
    let st = new Map();
    for (let i = 0; i < this.props.handles.length; i++) {
      let handle = this.props.handles[i];
      let url1 = "https://codeforces.com/api/user.info?handles=" + handle;
      let url2 = "https://codeforces.com/api/user.status?handle=" + handle;
      try {
        const response = await Axios.get(url1);
        if (data.maxRating < response.data.result[0].maxRating)
          data.maxRating = response.data.result[0].maxRating;
      } catch (err) {
        await console.error(err);
      }

      try {
        const response = await Axios.get(url2);
        for (let j = 0; j < response.data.result.length; j++) {
          
          if (
            response.data.result[j].verdict == "OK" && !st.has(response.data.result[j].problem.name)) {
                data.problemsSolved.add(response.data.result[j].problem);
                st.set(response.data.result[j].problem.name, 1);
          }
        }
      } catch (err) {
        await console.error(err);
      }
    }
    for (const problem of data.problemsSolved) {
      data.tagCount.set(
        problem.rating,
        data.tagCount.has(problem.rating)
          ? data.tagCount.get(problem.rating) + 1
          : 1
      );
      for (const catagory of problem.tags)
        data.tagCount.set(
          catagory,
          data.tagCount.has(catagory) ? data.tagCount.get(catagory) + 1 : 1
        );
    }
    data.tagCount = new Map(
      [...data.tagCount.entries()].sort((a, b) => b[1] - a[1])
    );
    try{
      let userfeatures = [];
      userfeatures.push(data.maxRating)
      for(let i = 0; i < taglist.length; i++){
          if(data.tagCount.has(taglist[i])) userfeatures.push(data.tagCount.get(taglist[i]));
          else userfeatures.push(0)
      }
      console.log(userfeatures);
      const responseRec = await Axios.get("http://localhost:5000?userfeatures="+JSON.stringify(userfeatures)).then((response) => response.data);
      let alpha = [];
      let beta = [];
      let st = new Set();
      data.problemsSolved.forEach(problem=>{
        st.add(problem.contestId + problem.index);
      });
      responseRec.forEach(problem=>{
        if(st.has(problem[0])){

        }else if(parseInt(problem[1]) >= data.maxRating - 250 && parseInt(problem[1]) <= data.maxRating + 450){
          if(alpha.length < 100)
          alpha.push(problem);
        }
      });
      data.recommendations = alpha;
    } catch(err){
      console.error(err);
    }
    console.log(data.recommendations);
    this.setState(data);
  }
  async componentDidMount() {
    await this.getStat();
  }
  async componentDidUpdate(prevProps) {
    if (prevProps.handles != this.props.handles) await this.getStat();
  }
  
  getTagData = () => {
    let data = []
    data.push(this.state.maxRating)
    let tagCount = this.state.tagCount;
    for(let i = 0; i < taglist.length; i++){
        if(tagCount.has(taglist[i])) data.push(tagCount.get(taglist[i]));
        else data.push(0)
    }
    return data;
  };
  getRecommendation = ()=>{
    let userfeatures = this.getTagData();
    fetchRecommendations(userfeatures).then(result =>{
      console.log(result);
    });
  };
  getRelativeDifficulty(rating){
    let l = Math.floor(this.state.maxRating  - 250);
    let d = Math.floor((rating - l) / 100);
    d += 1;
    return Math.min(d, 6);
  }
  getProblemUrl(problem){
    let cid = "";
    let pidx = "";
    let flag = 0;
    for(let i = 0; i < problem.length; i++){
      if(Number.isNaN(parseInt(problem[i]))) flag = 1;
      if(flag < 1) cid+=problem[i];
      else pidx+=problem[i];
    }
    
    return "https://codeforces.com/contest/"+cid+"/problem/"+pidx;
  }
  render() {
    if(this.state.recommendations.length < 1){
      return (
        <div className="RecommenderCard loader-container">
          <Spinner></Spinner>
        </div>
        
      );
    }
    return (
      <div className="RecommenderCard">
         
            {this.state.recommendations.map((problem, index) => {
              return (
                <FadeScroll key={index}>
                  <div className="rec-item">
                    <div className={'rec-lft dif-' + this.getRelativeDifficulty(problem[1])}>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>
                      <span></span>

                    </div>
                    <a className="rec-rht" href={this.getProblemUrl(problem[0])}>
                        {problem[0]}
                    </a>
                  </div>
                </FadeScroll>
              );
            })}
      </div>
    );
  }
}
RecommenderCard.defaultProps = {
  handles: [],
};
export default RecommenderCard;
