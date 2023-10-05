import {Component} from 'react'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

class TeamMatches extends Component {
  state = {
    teamsMatchData: {},
    isLoading: true,
  }

  componentDidMount() {
    this.getTeamsMatchData()
  }

  getUpdatedData = data => ({
    umpires: data.umpires,
    result: data.result,
    manOfTheMatch: data.man_of_the_match,
    id: data.id,
    date: data.date,
    venue: data.venue,
    competingTeam: data.competing_team,
    competingTeamLogo: data.competing_team_logo,
    firstInnings: data.first_innings,
    secondInnings: data.second_innings,
    matchStatus: data.match_status,
  })

  getTeamsMatchData = async () => {
    console.log(this.props)
    const {match} = this.props
    const {params} = match
    const {id} = params

    const response = await fetch(`https://apis.ccbp.in/ipl/${id}`)
    const data = await response.json()

    const updatedData = {
      teamBannerUrl: data.team_banner_url,
      latestMatchDetails: this.getUpdatedData(data.latest_match_details),
      recentMatches: data.recent_matches.map(eachMatch =>
        this.getUpdatedData(eachMatch),
      ),
    }
    console.log(updatedData.recentMatches)

    this.setState({teamsMatchData: updatedData, isLoading: false})
  }

  getRouteClassnames = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    switch (id) {
      case 'RCB':
        return 'rcb'
      case 'KKR':
        return 'kkr'
      case 'KXP':
        return 'kxp'
      case 'CSK':
        return 'csk'
      case 'RR':
        return 'rr'
      case 'MI':
        return 'mi'
      case 'SH':
        return 'sh'
      case 'DC':
        return 'dc'
      default:
        return ''
    }
  }

  renderRecentMatchesList = () => {
    const {teamsMatchData} = this.state
    const {recentMatches} = teamsMatchData
    return (
      <ul className="recent-match-list">
        {recentMatches.map(eachRecentMatch => (
          <MatchCard matchDetails={eachRecentMatch} key={eachRecentMatch.id} />
        ))}
      </ul>
    )
  }

  renderTeamMatches = () => {
    const {teamsMatchData} = this.state
    const {teamBannerUrl, latestMatchDetails} = teamsMatchData
    console.log(latestMatchDetails)
    return (
      <div className="responsive-container">
        <img src={teamBannerUrl} alt="team banner" className="team-banner" />
        <LatestMatch latestMatchDetails={latestMatchDetails} />
        {this.renderRecentMatchesList()}
      </div>
    )
  }

  render() {
    const {isLoading} = this.state
    return (
      <div className={`teams-match-container ${this.getRouteClassnames()}`}>
        {isLoading ? (
          <div data-testid="loader" className="loader-container">
            <Loader type="Oval" color="#ffffff" height={50} />
          </div>
        ) : (
          this.renderTeamMatches()
        )}
      </div>
    )
  }
}

export default TeamMatches
