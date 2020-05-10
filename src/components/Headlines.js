import React from 'react';
import { connect } from 'react-redux';
import { makeApiCall } from './../actions';

class Headlines extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   error: null, 
    //   isLoaded: false, 
    //   headlines: []
    // };
  }
  // makeApiCall = () => {
  //   fetch(`https://api.nytimes.com/svc/topstories/v2/home.json?api-key=${process.env.REACT_APP_API_KEY}`)
  //     .then(response => response.json())
  //     .then(
  //       (jsonifiedResponse) => {
  //         this.setState({
  //           isLoaded: true, 
  //           headlines: jsonifiedResponse.results
  //         });
  //       })
  //       .catch((error) => {
  //         this.setState({
  //           isLoaded: true, 
  //           error
  //         })
  //       })
  // }

  componentDidMount() {
   const { dispatch } = this.props;
   dispatch(makeApiCall());
  }

  render() {
    // deconstruct this.state to extract each of properties instead of having to write this.state.headlines or this.props every time. 
    const { error, isLoading, headlines } = this.props; 
    // as long as errors default state of null is not changed this conditional will not be triggered. 
    if (error) {
      return <React.Fragment>Error: {error.message}</React.Fragment>;
    } else if (isLoading) {
      return <React.Fragment>Loading...</React.Fragment>;
    } else {
      return (
        <React.Fragment>
          <h1>Headlines</h1>
          <ul>
            {headlines.map((headline, index) =>
              <li key={index}>
                <h3>{headline.title}</h3>
                <p>{headline.abstract}</p>
              </li>
            )}
          </ul>
        </React.Fragment>
      );
    }
  }
}

const mapStateToProps = state => {
  return {
    headlines: state.headlines, 
    isLoading: state.isLoading, 
    error: state.error
  }
}

export default connect(mapStateToProps)(Headlines); 