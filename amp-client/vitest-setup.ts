import "@testing-library/jest-dom/vitest"
import { afterAll, beforeAll } from "vitest"

beforeAll(() => {
    // テスト実行前に実行される処理
    console.log('beforeAll')
    })
afterAll(() => {
    // テスト実行後に実行される処理
    console.log('afterAll')
    })