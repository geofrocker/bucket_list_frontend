import React from 'react';
import UpdateBucket from '../views/UpdateBucket';

import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<UpdateBucket />', ()=>{
    beforeEach(() => {
        global.localStorage = {
            token: 'someToken',
            getItem: function () {
                return 'someToken'
            }
        };
    });

    it('contains  update bucket form', function () {
        const props = {
            match:{
                params: {bucket_id:1}
            }
        };
        const wrapper = mount(
            <MemoryRouter>
                <UpdateBucket {...props}/>
            </MemoryRouter>);

        const preventDefault = jest.fn();
        wrapper.setState({bucket_name:'test_bucket', description:"test description", isAuthorized:true});

        setTimeout(() => {
            expect(wrapper.find("#update_bucket_form").length === 1);
            wrapper.find("#update_bucket_form").simulate('submit', {preventDefault})

        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();


    });

    it('should change values in the form', function () {
        const props = {
            match:{
                params: {bucket_id:1}
            }
        };
        const wrapper = mount(
            <MemoryRouter>
                <UpdateBucket {...props}/>
            </MemoryRouter>);
        setTimeout(() => {
            wrapper.find("bucket_name").simulate('change', {target: {value: 'test bucket name'}});
            wrapper.find("description").simulate('change', {target: {value:'test description'}});
            wrapper.find("category").simulate('change', {target: {value:'test category'}});
        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();
    })



});

