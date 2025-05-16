Feature: Successful ticket purchase
    Scenario: Purchasing a standard seat
        Given user is on page
        When user selects day
        And user selects a standard hall
        And user selects a standard seat
        And user selects booking
        Then user should see "Вы выбрали билеты:"
        When user get code
        Then user should see "Электронный билет"

    Scenario: Purchasing a VIP seat
        Given user is on page
        When user selects day
        And user selects a VIP hall
        And user selects a VIP seat
        And user selects booking
        Then user should see "Вы выбрали билеты:"
        When user get code
        Then user should see "Электронный билет"