Feature: Unsuccessful ticket purchase
    Scenario: Reservation of a purchased seat
        Given user is on a hall with a purchased seat
        When user selects a purchased seat
        Then user should see inactive button