import React from 'react';
import Register from '../views/Register';
import {mount} from 'enzyme';
import toJson from 'enzyme-to-json';
import {MemoryRouter} from 'react-router-dom';

describe('<Register />', ()=>{
    it('contains signup form', function () {
        const wrapper = mount(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>);
        const preventDefault = jest.fn();

        wrapper.setState({email:'ridgekimani@gmail.com', password:"milimani", confirm_password:"milimani"});
        expect(wrapper.find("#signup").length === 1);
        wrapper.find("#signup").simulate('submit', {preventDefault});
        expect(toJson(wrapper)).toMatchSnapshot();
        expect(preventDefault).toBeCalled();
    });

    it('should change the values to the email input in the form', function(){
        const wrapper = mount(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>);
        wrapper.find("#email").simulate('change', {target: {value: 'example@email.com'}});
        expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('should change the values to the password input in the form', function(){
        const wrapper = mount(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>);
        wrapper.find("#password").simulate('change', {target: {value: 'milimani2'}});
        expect(toJson(wrapper)).toMatchSnapshot();

    });

    it('should change the values to the password input', function(){
        const wrapper = mount(
            <MemoryRouter>
                <Register/>
            </MemoryRouter>);
        wrapper.find("#confirm_password").simulate('change', {target: {value: 'milimani2'}});
        expect(toJson(wrapper)).toMatchSnapshot();

    })

});
