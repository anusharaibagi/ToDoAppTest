import {expect} from '@playwright/test'

export async function addTodo(page,text)
{
    await page.locator('.new-todo').fill(text);
    await page.keyboard.press('Enter');
}
export async function completeTodo(page,text)
{
    await page.locator('.todo-list li').filter({hasText: text}).locator('.toggle').check();
}
export async function filterTodo(page,text)
{
    await page.locator(`.filters >> text=${text}`).click();
    await expect(page.locator(`.filters >> text=${text}`)).toHaveClass(/selected/);
}
export async function deleteTodo(page,text)
{
    await page.locator('.todo-list li').filter({hasText: text}).locator('.destroy').click();
    await expect(page.locator('.todo-list li').filter({hasText: text})).toHaveCount(0);
}