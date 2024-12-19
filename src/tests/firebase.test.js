
import { jest } from '@jest/globals';
import { setDisplayData, subscribeToDisplayData } from '../firebase';

jest.mock("firebase/database", () => {
    return {
        getDatabase: jest.fn(),
        ref: jest.fn(),
        set: jest.fn().mockResolvedValue(true),
        onValue: jest.fn((ref, callback) => {
            callback({
                val: jest.fn().mockReturnValue({
                    content: "Test Content",
                    visibility: "visible",
                }),
            });
        }),
    };
});

describe('Firebase functions', () => {
    test('setDisplayData writes data to Firebase', async () => {
        const data = { content: "Test", visibility: "visible" };
        await setDisplayData(data);
        expect(set).toHaveBeenCalledWith(ref(expect.anything(), 'display/'), data);
    });

    test('subscribeToDisplayData retrieves and listens to Firebase data', () => {
        const mockCallback = jest.fn();
        subscribeToDisplayData(mockCallback);
        expect(mockCallback).toHaveBeenCalledWith({
            content: "Test Content",
            visibility: "visible",
        });
    });
});
