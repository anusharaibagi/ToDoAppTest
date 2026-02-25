import {test,expect} from '@playwright/test'
import { addTodo, completeTodo, filterTodo, deleteTodo }  from '../../utils/todoHelpers'


test.describe('TODO app flow',()=>
{
    test.beforeEach(async({page})=>{
        await page.goto('https://demo.playwright.dev/todomvc/#/')
    })

    test('User adds, compltetes, filters and delete items', async({page})=>{
        //ADD ITEMS
        await addTodo(page,'playwright')
        await addTodo(page,'CICD')

        //COMPLETE PLAYWRIGHT ITEM
        await completeTodo(page,'playwright');

        //FILTER ITEM
        //ALL
        await filterTodo(page,'All')
        await expect(page.locator('.todo-list li')).toHaveCount(2)
        //ACTIVE
        await filterTodo(page,'Active')
        await expect(page.locator('.todo-list li')).toHaveText('CICD')
        //COMPLETED
        await filterTodo(page,'Completed')
        await expect(page.locator('.todo-list li')).toHaveText('playwright')

        //DELETE ITEM
        await deleteTodo(page, 'playwright')
    })
})

