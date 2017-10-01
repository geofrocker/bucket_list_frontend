import React from 'react';
import ViewActivities from '../components/ViewActivities';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<ViewActivities />', ()=>{
    beforeEach(() => {
        global.localStorage = {
            token: 'someToken',
            getItem: function () {
                return 'someToken'
            }
        };

    });

    it('contains bucket table', function () {
        const props = {
            match:{
                params: {bucket_id:1}
            }
        };
        const wrapper = mount(
            <MemoryRouter>
                <ViewActivities {...props}/>
            </MemoryRouter>);

        wrapper.setState({data:[{ description:"test description"}], isAuthorized:true});

        setTimeout(() => {
            expect(wrapper.find("#activities_table").length === 1);

        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});

