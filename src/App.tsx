import '@flowable/forms/flwforms.min.css';
import "@flowable/work-views/dist/index.css";
import FlowableAppViewDemo from "./FlowableAppView";
import FlowableCaseViewDemo from "./FlowableCaseView";
import React from 'react';
import { BrowserRouter, Routes, Route, useParams } from 'react-router-dom';

// Wrapper components to extract route parameters
const AppRouteWrapper: React.FC = () => {
    const { appKey } = useParams<{ appKey: string }>();
    return <FlowableAppViewDemo flowAppId={appKey || ''} />;
}

const CaseRouteWrapper: React.FC = () => {
    const { caseInstanceId } = useParams<{ caseInstanceId: string }>();
    return <FlowableCaseViewDemo caseInstanceId={caseInstanceId || ''} />;
}

const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/apps/:appKey/" element={<AppRouteWrapper />} />
                <Route path="/cases/:caseInstanceId/" element={<CaseRouteWrapper />} />
            </Routes>
        </BrowserRouter>
    );
}
export default App;
