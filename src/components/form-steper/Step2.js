import React, { useState } from 'react';
//import Input from './input';
import axios from "axios";
import {NotificationContainer, NotificationManager} from 'react-notifications';


const API_KEY = "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";
const URL = "https://api.openai.com/v1/engines/davinci-instruct-beta/completions";
const userPrompt = "Gnerate Ideas ";



export default function Step2(props) {
	const [command, setCommand] = useState("");
	const [allGenIdeas, setAllGenIdeas] = useState([]);
	const [isDisabled, setIsDisabled] = useState(false);
	const [selectedGIText, setSelectedGIText] = useState("");

	function handleChange(event) {
		// Here, we invoke the callback with the new value
		setCommand(event.target.value)
		props.onChange(event);
	}
	async function GenCopy(userCommand) {
		const CallAPI = (userCommand) => {
			return {
				prompt: userPrompt + `${userCommand}`,
				temperature: 0,
				max_tokens: 500,
				top_p: 1,
				frequency_penalty: 0,
				presence_penalty: 0,
				stop: ["##", "English"],
			};
		};

		const data = CallAPI(userCommand.trim());
		const varHeaders = {
			'Content-Type': 'application/json',
			'Authorization': `Bearer ${API_KEY}`
		}
		/*
		const result = await axios.post(URL, data, {
			headers: varHeaders
		})
		.then((response) => {
			if(response)
			{
				console.log("response==>", response);
			}			
		})
		.catch((error) => {
			console.log("error==>", error);
		})
		return result;
		*/
		return new Promise((resolve, reject) => {
			axios.post(URL, data, { headers: varHeaders})
			.then(function (response) {
				resolve(response);
			})
			.catch(function (error) {
				reject(error);
			});
		});
	}
	const fnGenerateIdeas = async () => {
		if (command.trim() === "") 
		{   
			return(NotificationManager.error('', 'Please fill the Title fields to get the Ideas'));
		}
		setIsDisabled(true);
		let result = await GenCopy(props.values.title.trim());
		if(result.data.choices.length > 0)
		{
			setAllGenIdeas(result.data.choices);
			setIsDisabled(false);
		}
	}
	const fnSelectedText = (text) => {
		setSelectedGIText(text);
		//console.log("fnSelectedText==>",allGenIdeas[textIndex])	
		props.callBackStepTwo(text)	
	}


	return (
		<>
			<div className="step-count pb-2">Step 2 of 3</div>
			<div className="log-box-set">
				<div className="row">
					<div className="col-md-12"><div className="step-heading">Title*</div></div>
					<div className="col-md-12 mb-3"><div className="step-heading-sub">Write your own title or let us help you generate ideas.</div></div>
				</div>
				<div className="form-group mb-3 mt-2">
					<textarea className="form-control" disabled={isDisabled} id="exampleFormControlTextarea1" rows="2" name="title"  onChange={handleChange} value={selectedGIText  ? selectedGIText : props.values.title} disabled={(props.active === 2) ? false : true }></textarea>
					{props.errors.title && (<p className="help text-danger">{props.errors.title}</p>)}
				</div>
			</div>
			<div className="step-count pb-2" style={{cursor:'pointer', pointerEvents:isDisabled?'none':'visible'}} onClick={fnGenerateIdeas}>Generate ideas{(isDisabled)?<i className="fa fa-spinner fa-spin"></i>:''}</div>
			
			<div className="form-group">
				{
					(allGenIdeas)?					
						allGenIdeas.map((value, index) => (
							<div className="form-group" style={{cursor:'pointer',border:'1px solid grey'}} onClick={() => fnSelectedText(value.text)}>{value.text.substring(0, 100)+"..."} </div>
						))
					:
						null
				}
			</div>
			<NotificationContainer/>
		</>
	)
}