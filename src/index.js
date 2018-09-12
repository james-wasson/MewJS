import {Component, MountComponent} from './parser/parser';

if (window.MewJS) throw new Error("MewJS already defined on the window");

window.MewJS = {
    Component: Component,
    MountComponent: MountComponent
}