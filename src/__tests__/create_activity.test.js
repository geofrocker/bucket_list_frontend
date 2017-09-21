import React from 'react';
import CreateActivity from '../components/CreateActivity';

import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<CreateActivity />', ()=>{
    beforeEach(() => {
        global.localStorage = {
            token: 'someToken',
            getItem: function () {
                return 'someToken'
            }
        };

    });

    it('contains create activity form', function () {
        const props = {
            match:{
                params: {bucket_id:1}
            }
        };
        const wrapper = mount(
            <MemoryRouter>
                <CreateActivity {...props}/>
            </MemoryRouter>);

        const preventDefault = jest.fn();
        wrapper.setState({description:"test description", isAuthorized:true});

        setTimeout(() => {
            expect(wrapper.find("#create_activity_form").length === 1);
            wrapper.find("#create_activity_form").simulate('submit', {preventDefault})

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
                <CreateActivity {...props} />
            </MemoryRouter>);
        setTimeout(() => {
            wrapper.find("bucket_name").simulate('change', {target: {value: 'test bucket name'}});
            wrapper.find("description").simulate('change', {target: {value:'test description'}});
            wrapper.find("category").simulate('change', {target: {value:'test category'}});
        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();
    })



});

