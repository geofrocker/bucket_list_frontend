import React from 'react';
import UpdateActivity from '../views/UpdateActivity';

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

    it('contains update activity form', function () {
        const props = {
            match:{
                params: {bucket_id:1}
            }
        };
        const wrapper = mount(
            <MemoryRouter>
                <UpdateActivity {...props}/>
            </MemoryRouter>);

        const preventDefault = jest.fn();
        wrapper.setState({description:"test description", isAuthorized:true});

        setTimeout(() => {
            expect(wrapper.find("#update_activity_form").length === 1);
            wrapper.find("#update_activity_form").simulate('submit', {preventDefault})

        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();


    });

    it('should change values in the form', function () {
        const props = {
            match:{
                params: {bucket_id:1, item_id:1}
            }
        };
        const wrapper = mount(
            <MemoryRouter>
                <UpdateActivity {...props}/>
            </MemoryRouter>);
        setTimeout(() => {
            wrapper.find("description").simulate('change', {target: {value:'test description'}});
        }, 60);
        expect(toJson(wrapper)).toMatchSnapshot();
    })



});

