import React from 'react';
import Login from '../components/Login';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<Login />', ()=>{
    it('contains form', function () {
        const wrapper = mount(
            <MemoryRouter>
            <Login/>
        </MemoryRouter>);
        const preventDefault = jest.fn();

        wrapper.setState({email:'ridgekimani@gmail.com', password:"milimani"});
        expect(wrapper.find("#login-form").length === 1);
        wrapper.find("#login-form").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(preventDefault).toBeCalled();
    });

    it('should change the values to the email input', function(){
        const wrapper = mount(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);
        wrapper.find("#email").simulate('change', {target: {value: 'example@email.com'}});
        expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('should change the values to the password input', function(){
        const wrapper = mount(
            <MemoryRouter>
                <Login/>
            </MemoryRouter>);
        wrapper.find("#password").simulate('change', {target: {value: 'milimani'}});
        expect(toJson(wrapper)).toMatchSnapshot();

    })

});
