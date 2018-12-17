import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import App from './App';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-15';

Enzyme.configure({ adapter: new Adapter() });

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('renders table', () => {
  const app = shallow(<App/>);
  expect(app.find('div.App-container').length).toEqual(1);
});

it('renders all items', () => {
  const app = shallow(<App/>);
  expect(app.find('div.grid-item').length).toEqual(64);
});

