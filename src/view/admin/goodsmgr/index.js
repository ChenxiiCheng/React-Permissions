import React, { Component } from 'react';
import { Link, Switch, Route } from 'react-router-dom';
import AuthRoute from '../../../components/AuthRoute';

export default class GoodsMgr extends Component {
  render() {
    return (
      <div>
        <Link to={`${this.props.match.path}/p1`}>商品1</Link> |
        <Link to={`${this.props.match.path}/p2`}>商品2</Link>
        <hr />
        <Switch>
          <AuthRoute
            per={1587677116104}
            path={`${this.props.match.path}/p1`}
            render={() => {
              return <h2>p1线上</h2>;
            }}
          />
          <AuthRoute
            per={1587677131972}
            path={`${this.props.match.path}/p2`}
            render={() => {
              return <h2>p2线上</h2>;
            }}
          />
        </Switch>
      </div>
    );
  }
}
