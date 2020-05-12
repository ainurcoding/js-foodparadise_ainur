import React, { Component } from 'react';
import ImageAndWelcome from '../components/ImageAndWelcome';
import CityList from '../components/CityList';
import SearchCity from '../components/SearchCity';
import axios from 'axios';

class Home extends Component {
    constructor() {
        super();
        this.state = {
          keyword: "",
          featuredCities: null,
          citiesResultSearch: null
        };
      }
      changeKeywordHandler = (event) => {
          //console.log(event.target.value)
          this.setState = ({
              keyword: event.target.value,
          });
      };
      searchHandler = () => {
        let keyword = this.state.keyword
        var url = `https://developers.zomato.com/api/v2.1/cities`
        axios.get(url, {
          headers: {
            'user-key': 'API_KEY_ZOMATO'
          },
          params: {
            q: keyword
          }
        })
          .then(({ data }) => {
            if (data.status === 'success') {
                this.setState({ citiesResultSearch: data.location_suggestions })
            }
          })
          .catch(err => console.log(err))
      }

    getFeaturedCities = () => {
        var url = "https://developers.zomato.com/api/v2.1/cities"
        axios.get(url, {
            headers: {
                'user-key': 'API_KEY_ZOMATO'
            },
            params: {
                city_ids: "74,11052,170"
            }
        }).then(({data}) => {
            if (data.status === "success") {
                this.setState ( {featuredCities: data.location_suggestions})
            }
        }).catch(err => console.log(err));
    };

    componentDidMount() {
        this.getFeaturedCities();
    }
    render () {
        const citiesDummy = [
            { id: 72, name: "Jakarta", country_name: "Indonesia"},
            { id: 11052, name: "Bandung", country_name: "Indonesia"},
            { id: 170, name: "Bali", country_name: "Indonesia"}
          ];
        return (
            <>
        <ImageAndWelcome />
        <div className="container" style={{ marginTop:30 , marginBottom: 30}}>
            <CityList cities={this.state.featuredCities} 
            title={"Featured Cities"} />
            <SearchCity
            value={this.state.keyword}
            onChange={this.changeKeywordHandler}
            onClickSearch={this.searchHandler}
            />
            <CityList
            title={'Search Result'}
            cities={this.state.citiesResultSearch}
            />
         </div>
         </>
        )
    }
}

export default Home;