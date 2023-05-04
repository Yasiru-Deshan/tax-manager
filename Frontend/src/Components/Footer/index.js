import React from 'react';
import {
          FooterContainer,
          FooterLink,
          FooterLinkItems,
          FooterLinksContainer,
          FooterLinksWrapper,
          FooterWrap,
          SocialIconLink,
          SocialIcons,
          SocialLogo,
          SocialMedia,
          SocialMediaWrap,
          WebsiteRights,
        
} from './FooterElements'

const Footer = () => {
    return (
        <FooterContainer>
            <FooterWrap>
                <FooterLinksContainer>
                    <FooterLinksWrapper>
                        <FooterLinkItems>
                         
                                
                                <FooterLink to="/signin">FAQ</FooterLink>
                                <FooterLink to="/signin">Media Center</FooterLink>
                                <FooterLink to="/signin">Ways to Watch</FooterLink>
                                <FooterLink to="/signin">Speed Test</FooterLink>
                            
                        </FooterLinkItems>

                        <FooterLinkItems>
                         
                                
                                <FooterLink to="/signin">Help Center</FooterLink>
                                <FooterLink to="/signin">Investor Relations</FooterLink>
                                <FooterLink to="/signin">Terms of Use</FooterLink>
                                <FooterLink to="/signin">Corporate Information</FooterLink>
                              
                            
                        </FooterLinkItems>
                    </FooterLinksWrapper>

                    <FooterLinksWrapper>
                        <FooterLinkItems>
                         
                                
                                <FooterLink to="/signin">Account</FooterLink>
                                <FooterLink to="/signin">Jobs</FooterLink>
                                <FooterLink to="/signin">Privacy</FooterLink>       
                                <FooterLink to="/signin">Terms of Services</FooterLink>
                            
                        </FooterLinkItems>

                        <FooterLinkItems>
                         
                                
                                <FooterLink to="/signin">Only on FlickPlix</FooterLink>
                                 <FooterLink to="/signin">Contact Us</FooterLink>
                                  <FooterLink to="/signin">Legal Notices</FooterLink>
                                    <FooterLink to="/signin">Cookie Preferences</FooterLink>
                            
                        </FooterLinkItems>
                    </FooterLinksWrapper>
                </FooterLinksContainer>

                <SocialMedia>
                    <SocialMediaWrap>
                        <SocialLogo to='/'>
                            FlickPlix
                        </SocialLogo>
                        <WebsiteRights>FlickPlix © {new Date().getFullYear()} All rights reserved.</WebsiteRights>
                       
                    </SocialMediaWrap>
                </SocialMedia>
            </FooterWrap>
        </FooterContainer>
    )
}

export default Footer
