import {Form} from '@flowable/forms';
import '@flowable/forms/flwforms.min.css';
import {useEffect, useState} from "react";
import axios from "axios";

const OUTCOME_COMPLETE = 'complete';
const OUTCOME_SAVE = 'save'
function App() {
    let instance = axios.create(
    {
        auth : {
            username: "admin",
            password: "test"
        },
    }
);

    const [config, setConfig] = useState(null);
    const [payload, setPayload] = useState({});

    useEffect( () => {
        if(!config) {
            instance.get('/platform-api/tasks/TSK-a9210ece-87f4-11ee-801c-000d3aa513b0/form')
                .then(response => {
                    console.log("this is the config response: ", response)
                    return response.data;
                })
                .then(result => {
                    if(!result.outcomes || result.outcomes.length === 0){
                        result.outcomes = [
                            {
                                "value": "save",
                                "label": "Save"
                            },
                            {
                                "value":"complete",
                                "label":"Complete"
                            }
                        ]
                    }
                    setConfig(result)
                });
        }
    });
    useEffect(() => {
        if(Object.keys(payload).length === 0) {
            instance.get('/platform-api/tasks/TSK-a9210ece-87f4-11ee-801c-000d3aa513b0/variables')
                .then(response => {
                    console.log("this is the payload response: ", response.data);
                    return response.data;
                })
                .then(result => {
                    setPayload(result);
                });
        }
    })
    const onOutcomePressed = (payload, result) => {
        let data = {
            values: payload
        }
        if(result === OUTCOME_SAVE){
            instance.post('/platform-api/tasks/TSK-a9210ece-87f4-11ee-801c-000d3aa513b0/save-form', data)
                .then(response => console.log(response));
        } else if( result === OUTCOME_COMPLETE) {
            data.outcome = OUTCOME_COMPLETE;
            console.log('Task not completed because taskIds are currently hard coded: dont complete this task', data);
            //instance.post('/platform-api/tasks/TSK-a9210ece-87f4-11ee-801c-000d3aa513b0/complete', data)
        }
    }
    return (
        <div>
            { config ? <Form config={config} payload={payload} onOutcomePressed={onOutcomePressed}/> : <span>no content loaded</span>}
        </div>
    );
}
export default App;
