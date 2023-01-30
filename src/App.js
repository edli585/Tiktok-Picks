import {Routes, Route} from 'react-router-dom';
//import './App.css';
import CompareVids from './pages/CompareVids';
import MyVideos from './pages/MyVideos';
import SubmitVideo from './pages/SubmitVideo';
import Winner from './pages/Winner';
import Preview from './pages/Preview';


function App() {
  return (
    <>
      <Routes>
        <Route path = '/' exact element = {<MyVideos />} />
        <Route path = '/submit' exact element = {<SubmitVideo/>} />
        <Route path = '/preview' exact element = {<Preview />} />
        <Route path = '/compare' exact element = {<CompareVids />}/>
        <Route path = '/winner' exact element = {<Winner />}/>
      </Routes>
    </>
    
  );
}

export default App;
//