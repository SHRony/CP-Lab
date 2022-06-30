import { Component } from "react";
import React from "react";
import Axios from "axios";
import PieChart from "../Charts/PieChart/PieChart";
class CFstat extends Component{
    constructor(props){
        super(props);
        this.state = {
            handles : this.props.handles,
            maxRating : 0,
            submissions : [],
            problemsSolved : new Set(),
            diffCount : new Map(),
            catCount : new Map(),
            verCount : new Map(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],

        }
    }
    async componentDidMount(){
        let data = {
            handles : this.props.handles,
            maxRating : 0,
            submissions : [],
            problemsSolved : new Set(),
            diffCount : new Map(),
            catCount : new Map(),
            verCount : new Map(),
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],

        }
        for(let i = 0; i < this.props.handles.length; i++){
            let handle = this.props.handles[i];
            let url1 = "https://codeforces.com/api/user.info?handles=" + handle;
            let url2 = "https://codeforces.com/api/user.status?handle=" + handle;
            try {
                const response = await Axios.get(url1);
                if(data.maxRating < response.data.result[0].maxRating) data.maxRating = response.data.result[0].maxRating;
            } catch (err) {
                await console.error(err);
            }
            
            try {
                const response = await Axios.get(url2);
                for(let j = 0; j < response.data.result.length; j++){
                    data.submissions.push(response.data.result[j]);
                    data.verCount.set(response.data.result[j].verdict , data.verCount.has(response.data.result[j].verdict) ? data.verCount.get(response.data.result[j].verdict) + 1 : 1);
                    if(response.data.result[j].verdict == "OK") data.problemsSolved.add(response.data.result[j].problem);
                }
            } catch (err) {
                await console.error(err);
            }
            for(const problem of data.problemsSolved){
                data.diffCount.set(problem.rating , data.diffCount.has(problem.rating) ? data.diffCount.get(problem.rating) + 1 : 1);
            }
            
        }
        this.setState(data)
        console.log(data);
    }
    getVerData = () =>{
        console.log("asked for ver data");
        let data = {
            labels : [],
            datasets : [
                {
                    label : "# of Verdicts",
                    data : [],
                    backgroundColor : [],
                    borderColor : [],
                    borderWidth : 1,
                },
            ],
        };
        let i = 0;
        for(let [verdict , cnt] of this.state.verCount){
            data.labels.push(verdict);
            data.datasets[0].data.push(cnt);
            data.datasets[0].backgroundColor.push(this.state.backgroundColor[i % 6]);
            data.datasets[0].borderColor.push(this.state.borderColor[i % 6]);
            i++;
        }
        console.log("returned with ver data");

        return data;
    };

    render(){
        return (
            <div className="CFStat">
                <PieChart data = {this.getVerData()}></PieChart>
                {console.log("rendering cf stat")}
            </div>
        )
    }
}
CFstat.defaultProps = {
    handles : []
}
export default CFstat;