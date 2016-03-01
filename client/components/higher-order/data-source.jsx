import React, {Component} from 'react';
import { assign } from 'lodash';
import request from 'superagent';

const defaultOptions = {
  defaultData: {},
  loadingProp: 'loadingData',
  url: (options) => {
    return `/api/${options.source}`;
  }
};

function getWindowData(propName) {
  return window && window.props ? window.props[propName] : null;
}

const addDataSource = (options = {}, BaseComponent) => class extends Component {
  constructor(props) {
    super(props);
    if (!options.source) {
      throw new Error(`Error with higher-order component 'data-source', option 'source' is mandatory`);
    }
    //dynamic defaults
    defaultOptions.dataProp = options.source;
    defaultOptions.errorProp = `${options.source}Error`;

    this.opt = assign({}, defaultOptions, options);
    this.initialData = props[this.opt.dataProp];

    this.fetchUrl = this.opt.url(this.opt, this.props);

    this.state = {
      [this.opt.dataProp]: this.initialData || this.opt.defaultData,
      [this.opt.loadingProp]: false
    }
  }

  fetchData = () => {
    this.setState({
      [this.opt.loadingProp]: true
    });
    request.get(this.fetchUrl)
      .accept('json')
      .end((err, res) => {
        const newState = {
          [this.opt.loadingProp]: false
        };
        if (err) {
          newState[this.opt.errorProp] = err;
          newState[this.opt.dataProp] = this.opt.defaultData;
        } else {
          newState[this.opt.dataProp] = res.body;
        }
        this.setState(newState);
      });
  };

  componentDidMount() {
    if (!this.initialData) {
      const windowData = getWindowData(this.opt.dataProp);
      if (windowData) {
        this.setState({
          [this.opt.dataProp]: windowData
        });
      } else {
        this.fetchData();
      }
    }
  }

  componentWillReceiveProps() {
    const newUrl = this.opt.url(this.opt, this.props);
    if (this.fetchUrl !== newUrl) {
      this.fetchUrl = newUrl;
      this.fetchData();
    }
  }

  render() {
    return <BaseComponent {...this.props} {...this.state} />;
  }

};

function addDataSources(sources, Component) {
  return sources.reduce((BaseComponent, dataOptions) => addDataSource(dataOptions, BaseComponent), Component);
}

export {addDataSource, addDataSources};