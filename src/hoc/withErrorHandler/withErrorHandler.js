import React, { Component } from 'react'
import Modal from '../../components/UI/Modal/Modal'

function withErrorHandler(WrapperComponent, axios) {
  return class extends Component {
    state = {error: null}

    componentDidMount() {
      this.requestInterceptor = axios.interceptors.request.use(request => {
        this.setState({error: null})
        return request
      }, error => {
        this.setState({error: error})
      })
      
      this.responseInterceptor = axios.interceptors.response.use(response => {
        return response
      }, error => {
        this.setState({error: error})
      })
    }

    componentWillUnmount() {
      axios.interceptors.request.eject(this.requestInterceptor)
      axios.interceptors.response.eject(this.responseInterceptor)
    }

    render() {
      return <>
        <Modal show={this.state.error} onClick={() => {this.setState({error: null})}}>
          {this.state.error ? this.state.error.message : null}
        </Modal>
        <WrapperComponent {...this.props} />
      </>
    }
  }
}

export default withErrorHandler