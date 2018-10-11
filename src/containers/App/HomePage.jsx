import React from 'react';
import PropTypes from 'prop-types';
import {
    withStyles,
} from 'material-ui';
import {
    BrowserRouter,
    Link,
    Switch,
      Router,
      Route,
      Redirect,
      withRouter
  } from 'react-router-dom';
  // creates a beautiful scrollbar
  import PerfectScrollbar from 'perfect-scrollbar';
  import "perfect-scrollbar/css/perfect-scrollbar.css";
 
  import { connect } from 'react-redux';
 
  import { PrivateRoute } from '_components';
 
  import {
      Header, Footer, Sidebar
  } from 'components';
 
  import {appRoutesGuest,appRoutesNormal} from '../../routes/app.jsx';
 
  import { appStyle } from 'variables/styles';
 
  import image from 'assets/img/sidebar-2.jpg';
  import logo from 'assets/img/reactlogo.png';
import {cookies} from 'variables/general';

class HomePage extends React.Component {
    state = {
        mobileOpen: false,
    };
    handleDrawerToggle = () => {
        this.setState({mobileOpen: !this.state.mobileOpen});
    };

    getRoute() {
        //console.log(switchRoutes);
        return this.props.location.pathname !== "/maps";
    }

    componentDidMount() {
         if(window.innerWidth > 991)
         {
             // eslint-disable-next-line
             const ps = new PerfectScrollbar(this.refs.mainPanel);
         }
        //console.log(switchRoutes);
    }

    componentDidUpdate() {
        //this.refs.mainPanel.scrollTop = 0;
        this.refs.mainPanel.scrollTop = 0;
    }

    render() {
        const {classes, ...rest} = this.props;
        var appRoutes = cookies.get('username')==='guest'?appRoutesGuest:appRoutesNormal;
        var switchRoutes = (<Switch>
            {
                appRoutes.map((prop, key) => {
                    if (prop.redirect)
                        return (
                            <Redirect from={prop.path} to={prop.to} key={key} />
                        );
                    if (prop.collapse)
                        return prop.views.map((prop, key) => {
                            return (
                                <Route path={prop.path} component={prop.component} key={key} />
                            );
                        });
                    return (
                        <Route path={prop.path} component={prop.component} key={key} />
                    );
                })
            }
        </Switch>);
        return (
            <div className={classes.wrapper}>
                <Sidebar
                    routes={appRoutes}
                    logoText={"港口绩效数据库系统"}
                    logo={logo}
                    image={image}
                    handleDrawerToggle={this.handleDrawerToggle}
                    open={this.state.mobileOpen}
                    color="blue"
                    {...rest}
                />
                 <div className={classes.mainPanel} ref="mainPanel">
                    <Header
                    routes={appRoutes}
                    handleDrawerToggle={this.handleDrawerToggle}
                    {...rest}
                    />
                     {
                         this.getRoute() ? (
                           <div className={classes.content}>
                               <div className={classes.container}>
                               {switchRoutes}
                               </div>
                           </div>
                       ) : (
                               <div className={classes.map}>
                                  {switchRoutes}
                               </div>
                                           )
                                   }
                 </div>
            </div>
            //      //<h1>this is the new homepage</h1>
        );
        //return(<div>hello</div>);

    }
}

HomePage.propTypes = {
    classes: PropTypes.object.isRequired,
    theme: PropTypes.object.isRequired
};

export default withStyles(appStyle, { withTheme: true })(HomePage);

//export default {HomePage};

// function mapStateToProps(state) {
//     const { authentication } = state;
//     const { user } = authentication;
//     return {
//         user
//     };
// }

// const connectedHomePage = connect(mapStateToProps)(withStyles(appStyle, { withTheme: true })(HomePage));
// export { connectedHomePage as HomePage };


