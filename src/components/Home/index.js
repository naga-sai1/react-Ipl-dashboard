import {Component} from 'react'

import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import TeamCard from '../TeamCard'

import './index.css'

class Home extends Component {
  state = {
    isLoading: true,
    teamsData: [],
  }

  componentDidMount() {
    this.getTeams()
  }

  getTeams = async () => {
    const response = await fetch('https://apis.ccbp.in/ipl')
    const data = await response.json()
    const updatedData = data.teams.map(eachTeam => ({
      name: eachTeam.name,
      id: eachTeam.id,
      teamImageUrl: eachTeam.team_image_url,
    }))

    this.setState({teamsData: updatedData, isLoading: false})
  }

  render() {
    const {isLoading, teamsData} = this.state
    return (
      <div className="bg-container">
        <div className="teams-list-container">
          <div className="heading-and-logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
              alt="ipl logo"
              className="ipl-logo"
            />
            <h1 className="ipl-heading">IPL Dashboard</h1>
          </div>
          {isLoading ? (
            <div data-testid="loader" className="loader-container">
              <Loader type="Oval" color="#ffffff" height={50} width={50} />
            </div>
          ) : (
            <>
              <ul className="teams-list">
                {teamsData.map(eachTeam => (
                  <TeamCard teamsDetails={eachTeam} key={eachTeam.id} />
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    )
  }
}

export default Home
