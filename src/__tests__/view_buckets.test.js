import React from 'react';
import ViewBuckets from '../components/ViewBuckets';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<ViewBuckets />', ()=>{
    beforeEach(() => {
        global.localStorage = {
            token: 'someToken',
            getItem: function () {
                return 'someToken'
            }
        };

    });

    it('contains bucket table', function () {
        const wrapper = mount(
            <MemoryRouter>
                <ViewBuckets/>
            </MemoryRouter>);

        wrapper.setState({data:[{bucket_name:'test_bucket', description:"test description"}], isAuthorized:true});

        setTimeout(() => {
            expect(wrapper.find("#buckets_table").length === 1);

        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

});

