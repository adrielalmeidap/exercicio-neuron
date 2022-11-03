//import { Header } from './components/Header';
import { Page, usePage } from './contexts/Page';

const App = () => {
  const { page } = usePage();

  const renderSwitch = () => {
    switch (page) {
      case Page.Articles:
        return <div>Articles</div>
      case Page.Authors:
        return <div>Authors</div>
      default:
        return '';
    }
  }

  return (
    <div className="App">
      <header>
        <h1>
          <div className="title">Activity Neuron</div>
          <div className="subtitle">Create a CRUD with React and Spring Boot</div>
        </h1>
      </header>
      {renderSwitch()}
    </div>
  );
}

export default App;
