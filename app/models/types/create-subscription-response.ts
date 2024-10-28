export interface CreateSubscriptionResponse {
    data: SubscriptionData;
}

export interface SubscriptionData {
    id:                              string;
    email:                           string;
    status:                          string;
    created:                         number;
    subscription_tier:               string;
    subscription_premium_tier_names: string[];
    utm_source:                      string;
    utm_medium:                      string;
    utm_channel:                     string;
    utm_campaign:                    string;
    referring_site:                  string;
    referral_code:                   string;
}
