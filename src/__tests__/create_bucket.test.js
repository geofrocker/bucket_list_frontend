import React from 'react';
import CreateBucket from '../components/CreateBucket';

import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<CreateBucket />', ()=>{
    beforeEach(() => {
        global.localStorage = {
            token: 'someToken',
            getItem: function () {
                return 'someToken'
            }
        };

    });

    it('contains create bucket form', function () {
        const wrapper = mount(
            <MemoryRouter>
                <CreateBucket/>
            </MemoryRouter>);

        const preventDefault = jest.fn();
        wrapper.setState({bucket_name:'test_bucket', description:"test description", isAuthorized:true});

        setTimeout(() => {
            expect(wrapper.find("#create_bucket_form").length === 1);
            wrapper.find("#create_bucket_form").simulate('submit', {preventDefault})

        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();


    });

    it('should change values in the form', function () {
        const wrapper = mount(
            <MemoryRouter>
                <CreateBucket/>
            </MemoryRouter>);
        setTimeout(() => {
            wrapper.find("bucket_name").simulate('change', {target: {value: 'test bucket name'}});
            wrapper.find("description").simulate('change', {target: {value:'test description'}});
            wrapper.find("category").simulate('change', {target: {value:'test category'}});
        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();
    })



});

