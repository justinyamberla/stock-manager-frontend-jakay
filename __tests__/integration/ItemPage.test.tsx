import { render, screen, waitFor } from '@testing-library/react'
import ItemsPage from '@/app/admin/items/page'

test('renderiza lista de bienes', async () => {
    global.fetch = jest.fn(() =>
        Promise.resolve({
            json: () =>
                Promise.resolve({
                    success: true,
                    data: [
                        {
                            id: '1',
                            name: 'Laptop',
                            status: 'ACTIVE',
                            category: 'Tech',
                            createdAt: '2024-01-01'
                        }
                    ]
                })
        })
    ) as jest.Mock

    render(<ItemsPage />)

    await waitFor(() => {
        expect(screen.getByText('Laptop')).toBeInTheDocument()
        expect(screen.getByText('Tech')).toBeInTheDocument()
    })
})
